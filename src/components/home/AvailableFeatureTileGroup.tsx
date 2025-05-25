import { ListTile } from '../common/ListTile';

const features = [
    'GPT로 메일 정리해보기',
    '키워드로 메일 정리해보기',
    '발신자별로 메일 정리해보기',
    'AI 추천으로 메일 정리해보기',
];

export function AvailableFeatureTileGroup() {
    return (
        <div className="space-y-3">
            {features.map((feature, idx) => (
                <ListTile key={feature}>{feature}</ListTile>
            ))}
        </div>
    );
} 