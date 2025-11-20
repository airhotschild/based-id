import { ImageResponse } from '@vercel/og';
import { BasedResult } from './scoring';

interface CardData {
    username: string;
    pfpUrl?: string;
    result: BasedResult;
}

export function generateCardImage(data: CardData) {
    // Select gradient based on score
    let gradient = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    let accentColor = "#667eea";
    let secondaryColor = "#764ba2";

    if (data.result.score >= 900) {
        gradient = "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
        accentColor = "#f093fb";
        secondaryColor = "#f5576c";
    } else if (data.result.score >= 750) {
        gradient = "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
        accentColor = "#4facfe";
        secondaryColor = "#00f2fe";
    } else if (data.result.score >= 600) {
        gradient = "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)";
        accentColor = "#43e97b";
        secondaryColor = "#38f9d7";
    } else if (data.result.score >= 450) {
        gradient = "linear-gradient(135deg, #fa709a 0%, #fee140 100%)";
        accentColor = "#fa709a";
        secondaryColor = "#fee140";
    }

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: gradient,
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Main Card */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'white',
                        borderRadius: '48px',
                        padding: '60px',
                        boxShadow: `0 40px 100px rgba(0,0,0,0.4)`,
                    }}
                >
                    {/* Profile Picture */}
                    <div
                        style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '60px',
                            border: `5px solid ${accentColor}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: gradient,
                            fontSize: '60px',
                        }}
                    >
                        🎯
                    </div>

                    {/* Username */}
                    <div
                        style={{
                            fontSize: '48px',
                            fontWeight: '900',
                            color: '#1a1a1a',
                            marginTop: '20px',
                            display: 'flex',
                        }}
                    >
                        @{data.username}
                    </div>

                    {/* Score */}
                    <div
                        style={{
                            fontSize: '120px',
                            fontWeight: '900',
                            background: gradient,
                            backgroundClip: 'text',
                            color: 'transparent',
                            marginTop: '10px',
                            display: 'flex',
                        }}
                    >
                        {data.result.score}
                    </div>

                    {/* Rank Badge */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            marginTop: '10px',
                            padding: '15px 40px',
                            background: `linear-gradient(135deg, ${accentColor}20, ${secondaryColor}10)`,
                            borderRadius: '40px',
                            border: `3px solid ${accentColor}40`,
                        }}
                    >
                        <div style={{ fontSize: '48px', display: 'flex' }}>{data.result.badge}</div>
                        <div
                            style={{
                                fontSize: '40px',
                                fontWeight: '900',
                                color: '#1a1a1a',
                                display: 'flex',
                            }}
                        >
                            {data.result.rank.toUpperCase()}
                        </div>
                    </div>

                    {/* Percentile */}
                    <div
                        style={{
                            marginTop: '20px',
                            padding: '12px 30px',
                            background: gradient,
                            borderRadius: '30px',
                            fontSize: '20px',
                            fontWeight: '900',
                            color: 'white',
                            display: 'flex',
                        }}
                    >
                        TOP {data.result.percentile}% • FARCASTER
                    </div>

                    {/* Footer */}
                    <div
                        style={{
                            fontSize: '16px',
                            color: '#a0aec0',
                            fontWeight: '700',
                            marginTop: '25px',
                            display: 'flex',
                        }}
                    >
                        BASED ID
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
