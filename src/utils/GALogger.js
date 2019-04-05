export const GALogger = params => {
  window.logGaEvent({
    category: params.category,
    action: params.action,
    label: params.label
  });
};
