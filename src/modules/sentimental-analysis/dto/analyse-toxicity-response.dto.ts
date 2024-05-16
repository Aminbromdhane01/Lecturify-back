interface IFilteredData {
  label: string;
  match: boolean | null;
}

export class AnalyseToxicityDto {
  filteredData: IFilteredData[];
}
