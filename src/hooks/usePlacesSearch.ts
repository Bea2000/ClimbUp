import { useState, useCallback, useRef } from 'react';

import { PlaceResult, SearchResponse } from '@/types/placesSearch';

export function usePlacesSearch() {
  const [suggestions, setSuggestions] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedSearchPlaces = useCallback(async (query: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    return new Promise<void>((resolve) => {
      timeoutRef.current = setTimeout(async () => {
        if (!query.trim()) {
          setSuggestions([]);
          return;
        }

        try {
          setLoading(true);
          setError(null);

          const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Goog-Api-Key': process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
              'X-Goog-FieldMask': 'places.displayName,places.formattedAddress',
            },
            body: JSON.stringify({
              textQuery: query,
              languageCode: 'es',
              regionCode: 'CL',
            }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `Error ${response.status}: ${response.statusText}`);
          }

          const data: SearchResponse = await response.json();
          if (data.places.length === 0) {
            setSuggestions([]);
          } else {
            setSuggestions(data.places);
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Error desconocido');
          setSuggestions([]);
        } finally {
          setLoading(false);
        }
        resolve();
      }, 300);
    });
  }, []);

  return { suggestions, loading, error, searchPlaces: debouncedSearchPlaces };
} 
