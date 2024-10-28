import styled from 'styled-components';

const WidgetContainer = styled.div`
  width: 100%;
  height: ${({ sy }) => sy}px;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: ${({ gap }) => gap}px;
  overflow-x: scroll;
`;

const Widget = styled.div`
  border: 1px solid #ff0000;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

function useWidget({ size, gap }) {
  return {
    WidgetContainer: ({ sy, ...props }) => {
      return (
        <WidgetContainer sy={size * sy + gap * (sy - 1)} gap={gap} {...props} />
      );
    },
    Widget: ({ sx = 1, sy = 1, ...props }) => {
      return (
        <Widget
          width={size * sx + gap * (sy - 1)}
          height={size * sy + gap * (sy - 1)}
          {...props}
        />
      );
    },
  };
}

export { useWidget };
