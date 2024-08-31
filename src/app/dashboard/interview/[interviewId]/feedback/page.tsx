'use client'
import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import FeedbackCard from './components/feedback.card'
import { FeedBackData } from '@/utils/type'
const FeedBackPage = ({ params }: { params: { interviewId: string } }) => {
    const [feedBackData, setFeedBackData] = useState<FeedBackData[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const router = useRouter();
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}interview/feedback/${params.interviewId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            const data = await response.json();
            setFeedBackData(data.userAnswers);
        }

        fetchData();
    }, [params.interviewId])
    const getRatingColor = (rating: number) => {
        if (rating >= 8) return 'bg-green-500';
        if (rating >= 5) return 'bg-yellow-500';
        return 'bg-red-500';
    }

    const getUserAnswerColor = (rating: number) => {
        if (rating >= 8) return 'bg-green-100';
        if (rating >= 5) return 'bg-yellow-100';
        return 'bg-red-100';
    }

    return (
        <Card className='w-full h-full md:p-8 p-4 bg-[#f7f7f7] md:border-2 border-black flex flex-col justify-between'>
            <div className='flex flex-col gap-6'>
                <h1 className='text-2xl font-bold mb-6'>Feedback</h1>
                {feedBackData.length !== 0 && feedBackData && (
                    <FeedbackCard
                        item={feedBackData[currentQuestionIndex]}
                        index={currentQuestionIndex}
                        getRatingColor={getRatingColor}
                        getUserAnswerColor={getUserAnswerColor}
                    />
                )}
            </div>
            <div className='w-full flex justify-end gap-4 mt-4'>
                {currentQuestionIndex > 0 && feedBackData.length !== 0 && 
                    <Button
                        variant='neutral'
                        onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                    >
                        Previous Question
                    </Button>
                }
                {currentQuestionIndex !== feedBackData?.length - 1 && feedBackData.length !== 0 &&
                    <Button
                        variant='neutral'
                        onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                    >
                        Next Question
                    </Button>
                }
                {currentQuestionIndex === feedBackData?.length - 1  &&
                    <Button
                        variant='neutral'
                        onClick={() => router.push(`/dashboard`)}
                    >
                        End feedback
                    </Button>
                }
            </div>
        </Card>
    )
}

export default FeedBackPage
