/**
 * Renames some common hooks, so we can use an "unsafe" version,
 * in which the linting doesnt check the dependency array.
 *
 * Please use with care, as this can easily lead to bugs
 */
import { useEffect, useLayoutEffect, useMemo } from 'react';

export const useMemoUnsafe = useMemo;
export const useEffectUnsafe = useEffect;
export const useLayoutEffectUnsafe = useLayoutEffect;
