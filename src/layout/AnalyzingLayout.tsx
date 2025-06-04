import { AnalyzingStatusCard } from "../components/home/analyzingStatusCard";
import { TitleText } from "../components/common/TitleText";
import { Carousel } from "../components/common/carousel/CarouselCardList";
import { EffectCard } from "../components/home/carouselCards/EffectCard";
import cardData from "../mock/exampleCarouselData";
import { AvailableFeatureTileGroup } from "../components/home/AvailableFeatureTileGroup";

export function AnalyzingLayout({ progress, isComplete, showCheck }: { progress: number | undefined, isComplete: boolean, showCheck: boolean }) {
    return (
        <div className='px-4'>
            <div className='mt-4'>
                <AnalyzingStatusCard progress={progress} isComplete={isComplete} showCheck={showCheck} />
            </div>
            <div className='mt-4'>
                <TitleText text={'메일을 정리하면,\n 이런 효과가 있어요!'} />
            </div>
            <div className='mt-6'>
                <Carousel
                    data={cardData}
                    renderCard={(item, idx) => <EffectCard text={item.text} key={idx} />}
                />
            </div>
            <div className='mt-6'>
                <TitleText text={'메일 분석이 끝나면\n이런 기능들을 써볼 수 있어요!'} />
            </div>
            <div className='mt-6'>
                <AvailableFeatureTileGroup />
            </div>
        </div>
    )
}