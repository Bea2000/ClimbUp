'use client';

import { PlaceResult } from "@/types/placesSearch";

export default function ShowAddressOptions({ loading, suggestions, showSuggestions, handleSuggestionClick }: { loading: boolean, suggestions: PlaceResult[], showSuggestions: boolean, handleSuggestionClick: (address: string) => void }) {
  return (
    <>
      {loading && (
        <div className="absolute z-10 w-full rounded-md bg-base-100 p-2 shadow-lg">
          <div className="loading loading-spinner loading-sm"></div>
          <span className="ml-2">Buscando...</span>
        </div>
      )}

      {suggestions.length > 0 && showSuggestions && (
        <ul className="absolute z-10 mt-1 w-full rounded-md bg-base-100 shadow-lg">
          {suggestions.map((place, index) => (
            <button 
              key={index}
              type="button"
              className="w-full cursor-pointer p-2 text-left hover:bg-base-200"
              onClick={() => handleSuggestionClick(place.formattedAddress)}
            >
              <p className="font-medium">{place.displayName.text}</p>
              <p className="text-sm text-base-content/70">{place.formattedAddress}</p>
            </button>
          ))}
        </ul>
      )}
    </>
  )
}
