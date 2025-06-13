import type { CarbonCarouselData } from '../../types/carbonCarousel';
import { useCallback } from 'react';
import { getCarbonInfo } from '../../api/carbon';
import useUser from '../useUser';
import { useQuery } from '@tanstack/react-query';
import { CAROUSEL_TEMPLATE, type CarbonCarouselKey } from '../../data/carouselTemplate';
import type { CarbonApiResponse } from '../../types/carbonCarousel';
import { formatMetricValue } from '../../utils/format/metric';

const useFetchCarbonCarousel = () => {

    const userId = useUser()?.id ?? '';

    const { data: carbonCarouselData, isLoading: isCarbonLoading } = useQuery({
        queryKey: ['carbonCarouselData', userId],
        queryFn: () => getCarbonInfo(userId),
        enabled: !!userId,
        select: (data) => transformData(data),
    });

    const transformData = useCallback((data: CarbonApiResponse): CarbonCarouselData[] => {
        return Object.keys(CAROUSEL_TEMPLATE).map((key) => ({
            ...CAROUSEL_TEMPLATE[key as CarbonCarouselKey],
            metricValue: formatMetricValue(data[key as CarbonCarouselKey], CAROUSEL_TEMPLATE[key as CarbonCarouselKey].metricLabel),
        }));
    }, []);


    return { carbonCarouselData, isCarbonLoading };
}

export default useFetchCarbonCarousel