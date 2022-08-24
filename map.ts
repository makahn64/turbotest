type IconPosition = 'left' | 'right' | 'bottom' | 'top';

const positionMap: { [key in IconPosition]: string } = {
  top: 'column',
  right: 'row-reverse',
  left: 'row',
  bottom: 'column-reverse'
};

export const positionToFlex = (position: IconPosition) =>
  positionMap[position] || 'row';

export const postionToFlexOld = (position: IconPosition) => {
  // assuming icon first then label
  switch (position) {
    case 'left':
      return 'row';
    case 'right':
      return 'row-reverse';
    case 'bottom':
      return 'column-reverse';
    case 'top':
      return 'column';

    default:
      return 'row';
  }
};
