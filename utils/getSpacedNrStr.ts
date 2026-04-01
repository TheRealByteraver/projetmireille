const getSpacedNrStr = (nr: number): string => nr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export { getSpacedNrStr };
