
import { useMutation } from '@tanstack/react-query';
import { starMail, unstarMail } from '../../api/star';

type Props = {
    userId: string;
    mailId: string;
}

const useStarMail = ({ userId, mailId }: Props) => {
    const starMutation = useMutation({
        mutationFn: () => starMail(userId, mailId),
    });

    const unstarMutation = useMutation({
        mutationFn: () => unstarMail(userId, mailId),
    });

    return {
        starMutation,
        unstarMutation,
    }
}

export default useStarMail