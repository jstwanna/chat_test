type Modifiers = {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
};

type Binding = {
  value: {
    text?: string;
    position?: string;
  };
  modifiers: Modifiers;
};

const getPositionClass = (modifiers: Modifiers): string => {
  if (modifiers.top) {
    return 'top';
  } else if (modifiers.bottom) {
    return 'bottom';
  } else if (modifiers.left) {
    return 'left';
  } else if (modifiers.right) {
    return 'right';
  }

  return 'top';
};

export const TooltipDirective = (el: HTMLElement, binding: Binding): void => {
  el.setAttribute(
    'data-tooltip',
    binding.value?.text || binding.value.position || ''
  );
  el.classList.add('tooltip');

  const position =
    binding.value.position || getPositionClass(binding.modifiers);
  el.classList.add(`tooltip_position_${position}`);
};
