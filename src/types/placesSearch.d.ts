export interface PlaceResult {
    formattedAddress: string;
    displayName: {
      text: string;
      languageCode: string;
    };
  }
  
export interface SearchResponse {
  places: PlaceResult[];
}
