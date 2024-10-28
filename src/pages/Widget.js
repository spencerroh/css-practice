import React from 'react';
import styled from 'styled-components';

import Panel from '../components/Panel';

import { useWidget } from './Widget/useWidget';
import { useWidget as useWidgetV2 } from './Widget/useWidgetV2';

const Card = styled.div`
  border-radius: 10px;
  border: 1px solid #dddddd;
  padding: 20px;
`;

const WidgetPractice = (props) => {
  const widget = useWidget({
    size: 64,
    gap: 8,
  });

  const widgetV2 = useWidgetV2({
    direction: 'row',
    major: 2,
    size: 128,
    gap: 8,
    debug: true,
  });

  return (
    <Panel
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <Card style={{ width: '600px', overflowX: 'scroll' }}>
        <widgetV2.WidgetContainer sy={2}>
          <widgetV2.Widget sx={2} sy={1}>
            <img
              src={`https://picsum.photos/${widgetV2.getSize(2, 1).join('/')}`}
            />
          </widgetV2.Widget>
          <widgetV2.Widget sx={1} sy={1}>
            <img
              src={`https://picsum.photos/${widgetV2.getSize(1, 1).join('/')}`}
            />
          </widgetV2.Widget>
          <widgetV2.Widget sx={2} sy={1}>
            <img
              src={`https://picsum.photos/${widgetV2.getSize(2, 1).join('/')}`}
            />
          </widgetV2.Widget>
          <widgetV2.Widget sx={2} sy={2}>
            <img
              src={`https://picsum.photos/${widgetV2.getSize(2, 2).join('/')}`}
            />
          </widgetV2.Widget>
        </widgetV2.WidgetContainer>
      </Card>
      <Card>
        <widget.WidgetContainer sy={2}>
          <widget.Widget sx={2} sy={1}>
            1
          </widget.Widget>
          <widget.Widget sx={1} sy={1}>
            2
          </widget.Widget>
          <widget.Widget sx={1} sy={1}>
            3
          </widget.Widget>
          <widget.Widget sx={2} sy={1}>
            4
          </widget.Widget>
        </widget.WidgetContainer>
      </Card>
    </Panel>
  );
};

export default WidgetPractice;
