export function Loading() {
    return (
        <div className='flex justify-center py-8'>
            <svg className='animate-spin h-8 w-8 text-main' viewBox='0 0 24 24'>
                <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                    fill='none'
                />
                <circle
                    className='opacity-75'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                    strokeDasharray='60'
                    strokeDashoffset='15'
                    strokeLinecap='round'
                    fill='none'
                />
            </svg>
        </div>
    )
}

export function LoadingSmall({ color = '#FACC15' }: { color?: string }) {
    return (
        <div className='flex justify-center items-center'>
            <svg className='animate-spin h-5 w-5' style={{ color }} viewBox='0 0 24 24'>
                <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                    fill='none'
                />
                <circle
                    className='opacity-75'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                    strokeDasharray='60'
                    strokeDashoffset='15'
                    strokeLinecap='round'
                    fill='none'
                />
            </svg>
        </div>
    )
}

export default Loading