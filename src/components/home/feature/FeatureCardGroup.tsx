import { featureCardList } from "../../../data/featureCardData";
import { FeatureCard } from "./FeatureCard";

export function FeatureCardGroup() {
    return (
        <div className='w-full px-2'>
            {featureCardList.map((data, idx) => (
                <FeatureCard key={idx} data={data} />
            ))}
        </div>
    );
}