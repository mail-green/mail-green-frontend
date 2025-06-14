import type { CarbonCarouselData } from '../../types/carbonCarousel';
import { getCarbonInfo } from '../../api/carbon';
import useUser from '../useUser';
import { useQuery } from '@tanstack/react-query';
import { CAROUSEL_TEMPLATE, type CarbonCarouselKey } from '../../data/carouselTemplate';
import type { CarbonApiResponse } from '../../types/carbonCarousel';
import { formatMetricValue } from '../../utils/format/metric';
const useFetchCarbonCarousel = () => {

    const userId = useUser()?.id ?? '';

    // JS 문법상 순서를 바꾸니까 갑자기 안됨.
    const transformData = (data: CarbonApiResponse): CarbonCarouselData[] => {
        return Object.keys(CAROUSEL_TEMPLATE).map((key) => ({
            ...CAROUSEL_TEMPLATE[key as CarbonCarouselKey],
            metricValue: formatMetricValue(data[key as CarbonCarouselKey], CAROUSEL_TEMPLATE[key as CarbonCarouselKey].metricLabel),
        }));
    }

    const { data, isFetching: isCarbonLoading } = useQuery({
        queryKey: ['carbonCarouselData', userId],
        queryFn: () => getCarbonInfo(userId),
        enabled: !!userId,
        select: (data) => transformData(data),
    });

    return { carbonCarouselData: data ?? [], isCarbonLoading };
}

export default useFetchCarbonCarousel