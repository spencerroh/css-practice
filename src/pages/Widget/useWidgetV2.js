import styled from 'styled-components';

const WidgetContainer = styled.div`
  display: grid;
  grid-gap: ${({ gap }) => gap}px;
`;
const WidgetRowContainer = styled(WidgetContainer)`
  grid-template-rows: repeat(${({ major }) => major}, ${({ size }) => size}px);
  grid-auto-columns: ${({ size }) => size}px;
  grid-auto-flow: column;
`;

const WidgetColumnContainer = styled(WidgetContainer)`
  grid-template-columns: repeat(
    ${({ major }) => major},
    ${({ size }) => size}px
  );
  grid-auto-rows: ${({ size }) => size}px;
  grid-auto-flow: row;
`;

const Widget = styled.div`
  grid-row: span ${({ sy }) => sy};
  grid-column: span ${({ sx }) => sx};
`;

const DebugWidget = styled(Widget)`
  position: relative;
  &:after {
    content: ' ';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 60%,
      rgba(255, 0, 0, 1) 100%
    );
    border: 1px solid blue;
  }
`;

function useWidget({ major, size, gap, direction, debug }) {
  const $WidgetContainer =
    direction === 'row' ? WidgetRowContainer : WidgetColumnContainer;
  const $Widget = debug ? DebugWidget : Widget;

  return {
    WidgetContainer: ({ ...props }) => {
      return (
        <$WidgetContainer
          major={major}
          size={size}
          gap={gap}
          {...props}
        ></$WidgetContainer>
      );
    },
    Widget: ({ ...props }) => {
      return <$Widget {...props}></$Widget>;
    },
    getSize: (sx, sy) => {
      return [sx * size + gap * (sx - 1), sy * size + gap * (sy - 1)];
    },
  };
}

export { useWidget };
