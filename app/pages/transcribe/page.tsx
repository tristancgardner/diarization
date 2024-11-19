"use client";

import AudioWaveform, {
    TranscriptionResult,
} from "@/components/custom/diar-plot";
import PromptLlama from "@/components/inference/prompt-llama";
import Summarize from "@/components/asr_analysis/Summarize";
import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { Speaker } from "@/components/custom/diar-plot";
import { motion } from "framer-motion";

export default function TranscribePage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [transcriptionResult, setTranscriptionResult] =
        useState<TranscriptionResult | null>(null);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleTranscriptionResult = (result: TranscriptionResult) => {
        console.log("Parent received updated transcription result:", result);
        setTranscriptionResult(result);
    };

    return (
        <BackgroundWrapper imagePath='/images/electric_timeline.png'>
            <main className='flex min-h-screen flex-col items-center justify-between p-24 pt-9'>
                <div className='w-full max-w-7xl mx-auto relative'>
                    <PageHeader />
                    <div className='p-4'>
                        <AudioWaveform
                            transcriptionResult={transcriptionResult}
                            setTranscriptionResult={handleTranscriptionResult}
                        />
                    </div>
                    <motion.div
                        className='p-4'
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: isLoaded ? 1 : 0 }}
                        transition={{ delay: 1.1, duration: 0.6 }}
                    >
                        <Summarize
                            transcript={transcriptionResult?.transcript || ""}
                            existingSummary={transcriptionResult?.summary}
                            fileName={transcriptionResult?.file_name}
                            onSummaryGenerated={(summary) => {
                                if (transcriptionResult) {
                                    setTranscriptionResult({
                                        ...transcriptionResult,
                                        summary,
                                    });
                                }
                            }}
                        />
                    </motion.div>
                    <motion.div
                        className='p-4'
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: isLoaded ? 1 : 0 }}
                        transition={{ delay: 1.25, duration: 0.6 }}
                    >
                        <PromptLlama />
                    </motion.div>
                </div>
            </main>
        </BackgroundWrapper>
    );
}
