import {
  atom,
  RecoilRoot,
  selector,
  selectorFamily,
  useRecoilValue,
  atomFamily,
  useSetRecoilState,
} from 'recoil';

import {
  Button,
  SwitchUI,
  ProductPanel,
  DevicePanel,
  Code,
  ListUI,
  View,
} from './RecoilTest/Components';

function makeProduct(productId) {
  const newId = productId % 2 === 0 ? productId - 1 : productId;
  const ids = [newId.toString(), (newId + 1).toString()];
  return {
    productId: newId.toString(),
    units: [ids[0], ids[1]],
    devices: {
      [ids[0]]: {
        id: ids[0],
        remoteControl: {
          id: 'remoteControl',
          value: 'on',
          options: ['on', 'off'],
          readOnly: true,
          enabled: true,
          setter: 'setRemoteControl',
        },
        brightness: {
          id: 'brightness',
          value: '밝게',
          options: [
            '선택 안함',
            '어둡게',
            '조금 어둡게',
            '보통',
            '밝게',
            '아주 밝게',
          ],
          readOnly: true,
          enabled: false,
        },
      },
      [ids[1]]: {
        id: ids[1],
        remoteControl: {
          id: 'remoteControl',
          value: 'off',
          options: ['on', 'off'],
          readOnly: false,
          enabled: true,
          setter: 'setRemoteControl',
        },
        brightness: {
          id: 'brightness',
          value: '밝게',
          options: [
            '선택 안함',
            '어둡게',
            '조금 어둡게',
            '보통',
            '밝게',
            '아주 밝게',
          ],
          readOnly: true,
          enabled: false,
        },
      },
    },
  };
}

const productIdsAtom = atom({
  key: 'productIds',
  default: [],
});

const unitsAtom = atom({
  key: 'units',
  default: [],
});

const devicesAtom = atomFamily({
  key: 'devices',
  default: {},
});

const selectProductSelector = selector({
  key: 'selectProductSelector',
  get: ({ get }) => {
    return get(productIdsAtom);
  },
  set: ({ get, set }, productId) => {
    const productIds = get(productIdsAtom);
    if (productIds.includes(productId)) {
      return;
    }

    const product = makeProduct(productId);

    set(unitsAtom, product.units);

    for (const unit of product.units) {
      set(devicesAtom(unit), product.devices[unit]);
    }

    set(productIdsAtom, product.units);
  },
});

const featureSelector = selectorFamily({
  key: 'featureSelector',
  get:
    (featureUri) =>
    ({ get }) => {
      const [unitId, featureId] = featureUri.split('/');

      if (unitId === '*') {
        const units = get(unitsAtom);

        const result = [];
        for (const unit of units) {
          const device = get(devicesAtom(unit));
          result.push({
            unit: unit,
            ...device[featureId],
          });
        }

        return result;
      } else {
        const device = get(devicesAtom(unitId));

        return {
          unit: unitId,
          ...device[featureId],
        };
      }
    },
});

const updateDeviceSelector = selectorFamily({
  key: 'updateDeviceSelector',
  set:
    (unit) =>
    ({ get, set }, updated) => {
      const device = get(devicesAtom(unit));

      const newDevice = {
        ...device,
        ...updated,
      };

      set(devicesAtom(unit), newDevice);
    },
});

const $ = {
  onOffToBool: (v) => {
    if (v === 'on') return true;
    return false;
  },
  brightnessToBool: (v) => {
    if (v === '선택 안함') return false;
    return true;
  },
};

// common, main, sub
function View1() {
  const selectProduct = useSetRecoilState(selectProductSelector);
  const units = useRecoilValue(unitsAtom);
  const devices = [
    useRecoilValue(devicesAtom(units[0])),
    useRecoilValue(devicesAtom(units[1])),
  ];
  const updateDevice1 = useSetRecoilState(updateDeviceSelector(units[0]));
  const updateDevice2 = useSetRecoilState(updateDeviceSelector(units[1]));

  console.log('View1 Rendered', units);

  const onClick = (v) => {
    selectProduct(v);
  };

  const onDevice = (v, featureId, optionId, optionValue) => {
    if (v === 0) {
      updateDevice1({
        [featureId]: {
          ...devices[0][featureId],
          [optionId]: optionValue,
        },
      });
    } else {
      updateDevice2({
        [featureId]: {
          ...devices[1][featureId],
          [optionId]: optionValue,
        },
      });
    }
  };

  return (
    <div>
      <ProductPanel>
        <DevicePanel>
          <p>워시타워</p>
          <Button onClick={() => onClick(1)}>세탁기</Button>
          <Button onClick={() => onClick(2)}>건조기</Button>
        </DevicePanel>
        <DevicePanel>
          <p>세탁건조기</p>
          <Button onClick={() => onClick(3)}>세탁건조기</Button>
          <Button onClick={() => onClick(4)}>미니워시</Button>
        </DevicePanel>
      </ProductPanel>
      <div>
        {[
          { name: '기기1', index: 0 },
          { name: '기기2', index: 1 },
        ].map((device) => (
          <>
            <p>{device.name}</p>
            <div>
              <Button
                onClick={() =>
                  onDevice(device.index, 'remoteControl', 'value', 'on')
                }
              >
                원격제어 on
              </Button>
              <Button
                onClick={() =>
                  onDevice(device.index, 'remoteControl', 'value', 'off')
                }
              >
                원격제어 off
              </Button>
              <Button
                onClick={() =>
                  onDevice(device.index, 'remoteControl', 'enabled', true)
                }
              >
                enabled
              </Button>
              <Button
                onClick={() =>
                  onDevice(device.index, 'remoteControl', 'enabled', false)
                }
              >
                disabled
              </Button>
              <Button
                onClick={() =>
                  onDevice(device.index, 'brightness', 'value', '선택 안함')
                }
              >
                밝기: 선택안함
              </Button>
              <Button
                onClick={() =>
                  onDevice(device.index, 'brightness', 'value', '보통')
                }
              >
                밝기: 보통
              </Button>
              <Button
                onClick={() =>
                  onDevice(device.index, 'brightness', 'value', '아주 밝게')
                }
              >
                밝기: 아주 밝게
              </Button>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

function View2() {
  const remoteControl = useRecoilValue(featureSelector('*/remoteControl'));

  console.log('View2 Rendered');

  return (
    <View>
      <p>product</p>
      <Code>{JSON.stringify(remoteControl, null, 2)}</Code>
    </View>
  );
}

function Switch({ selection, valueConverter = (v) => v }) {
  const value = valueConverter(selection.value);

  if (selection == null) {
    return <></>;
  }

  return (
    <p>
      <span>{selection.label ?? selection.id ?? '--'}</span>
      <SwitchUI value={value} enabled={selection.enabled}></SwitchUI>
    </p>
  );
}

function List({ selection, valueConverter = (v) => v }) {
  if (selection == null) {
    return <></>;
  }

  return (
    <ListUI>
      <span>{selection.label ?? selection.id ?? '--'}</span>
      <ol type='1'>
        {(selection.options ?? []).map((option) => (
          <li>
            {option}
            {option === selection.value ? '(선택됨)' : ''}
          </li>
        ))}
      </ol>
    </ListUI>
  );
}

function View3() {
  const units = useRecoilValue(unitsAtom);
  const remoteControl = useRecoilValue(
    featureSelector(`${units[0]}/remoteControl`)
  );

  console.log('View3');

  return (
    <View>
      기기1
      <Switch selection={remoteControl} valueConverter={$.onOffToBool} />
    </View>
  );
}

function View4() {
  const units = useRecoilValue(unitsAtom);
  const remoteControl = useRecoilValue(
    featureSelector(`${units[1]}/remoteControl`)
  );

  console.log('View4');

  return (
    <View>
      <h1>기기2</h1>
      <span>스위치 스타일</span>
      <Switch selection={remoteControl} valueConverter={$.onOffToBool} />
      <span>리스트 스타일</span>
      <List selection={remoteControl} />
    </View>
  );
}

function View5() {
  const units = useRecoilValue(unitsAtom);
  const remoteControl = useRecoilValue(
    featureSelector(`${units[0]}/brightness`)
  );

  console.log('View4');

  return (
    <View>
      <h1>기기1 - 밝기</h1>
      <span>리스트 스타일</span>
      <List selection={remoteControl} />
      <Switch selection={remoteControl} valueConverter={$.brightnessToBool} />
    </View>
  );
}

function RecoilTest() {
  return (
    <RecoilRoot>
      <div
        style={{
          overflowY: 'scroll',
        }}
      >
        <View1 />
        <ProductPanel>
          <DevicePanel>
            <View2 />
          </DevicePanel>
          <DevicePanel>
            <View3 />
            <View4 />
            <View5 />
          </DevicePanel>
        </ProductPanel>
      </div>
    </RecoilRoot>
  );
}

export { RecoilTest };
