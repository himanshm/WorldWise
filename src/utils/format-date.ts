export type optionsObject = {
  day: 'numeric' | '2-digit';
  month: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  year: 'numeric' | '2-digit';
  weekday?: 'long' | 'short' | 'narrow';
};

export const formatDate = (date: string | Date, options?: optionsObject) =>
  new Intl.DateTimeFormat('en', options).format(new Date(date));
