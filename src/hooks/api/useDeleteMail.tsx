import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMail } from '../../api/mail';

type Props = {
    userId: string;
    messageIds: string[];
    confirm: boolean;
}

const useDeleteMail = ({ userId, messageIds, confirm }: Props) => {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: () => deleteMail(userId, messageIds, confirm),
        onSuccess: (data) => {
            if (data.deleted) {
                queryClient.invalidateQueries({ queryKey: ['mailSender'] });
            }
        },
    });

    return {
        deleteMutation,
    }
}

export default useDeleteMail