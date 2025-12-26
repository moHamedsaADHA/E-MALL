// Basic API features like filtering, sorting, pagination placeholder
export class APIFeatures {
  constructor(private query: any, private queryString: any) {}
  filter() { return this; }
  sort() { return this; }
  paginate() { return this; }
}

export default APIFeatures;
