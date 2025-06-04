import { ListTile } from '../common/ListTile';
import { useNavigate } from 'react-router-dom';

const features = [
    'GPT로 메일 정리해보기',
    '키워드로 메일 정리해보기',
    '발신자별로 메일 정리해보기',
    'AI 추천으로 메일 정리해보기',
];

export function AvailableFeatureTileGroup() {
    const navigate = useNavigate();
    return (
        <div className="space-y-3">
            {features.map((feature) => (
                <ListTile key={feature} onClick={() => {
                    navigate(`/home/feature/${feature}`);
                }}>{feature}</ListTile>
            ))}
        </div>
    );
} 