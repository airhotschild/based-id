import { ImageResponse } from '@vercel/og';
import { BasedResult } from './scoring';

interface CardData {
    username: string;
    pfpUrl?: string;
    result: BasedResult;
}

export function generateCardImage(data: CardData) {
    // Select gradient based on score - more vibrant colors
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
                    position: 'relative',
                    background: gradient,
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Decorative background circles */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-100px',
                        right: '-100px',
                        width: '400px',
                        height: '400px',
                        borderRadius: '200px',
                        background: `radial-gradient(circle, ${accentColor}40, transparent)`,
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-150px',
                        left: '-150px',
                        width: '500px',
                        height: '500px',
                        borderRadius: '250px',
                        background: `radial-gradient(circle, ${secondaryColor}30, transparent)`,
                    }}
                />

                {/* Pattern overlay */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0.08,
                        background: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,.2) 40px, rgba(255,255,255,.2) 80px)',
                    }}
                />

                {/* Main container */}
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px',
                    }}
                >
                    {/* Card with dramatic shadow */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(145deg, #ffffff, #f7f7f7)',
                            borderRadius: '48px',
                            padding: '50px 70px',
                            boxShadow: `0 40px 100px rgba(0,0,0,0.5), 0 0 80px ${accentColor}60, inset 0 1px 0 rgba(255,255,255,0.9)`,
                            border: '3px solid rgba(255,255,255,0.9)',
                            position: 'relative',
                            width: '880px',
                        }}
                    >
                        {/* Top decorative corners */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '20px',
                                left: '20px',
                                width: '60px',
                                height: '60px',
                                borderTop: `5px solid ${accentColor}`,
                                borderLeft: `5px solid ${accentColor}`,
                                borderRadius: '12px 0 0 0',
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                width: '60px',
                                height: '60px',
                                borderTop: `5px solid ${secondaryColor}`,
                                borderRight: `5px solid ${secondaryColor}`,
                                borderRadius: '0 12px 0 0',
                            }}
                        />

                        {/* Profile Picture with layered glow */}
                        <div
                            style={{
                                display: 'flex',
                                position: 'relative',
                                marginTop: '10px',
                            }}
                        >
                            {/* Outer glow layer 1 */}
                            <div
                                style={{
                                    position: 'absolute',
                                    width: '180px',
                                    height: '180px',
                                    borderRadius: '90px',
                                    background: gradient,
                                    opacity: 0.2,
                                    top: '-30px',
                                    left: '-30px',
                                }}
                            />
                            {/* Outer glow layer 2 */}
                            <div
                                style={{
                                    position: 'absolute',
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '75px',
                                    background: gradient,
                                    opacity: 0.3,
                                    top: '-15px',
                                    left: '-15px',
                                }}
                            />

                            {data.pfpUrl && (
                                <img
                                    src={data.pfpUrl}
                                    alt="pfp"
                                    width={120}
                                    height={120}
                                    style={{
                                        borderRadius: '60px',
                                        border: `5px solid ${accentColor}`,
                                        boxShadow: `0 10px 30px rgba(0,0,0,0.3), 0 0 20px ${accentColor}80`,
                                        position: 'relative',
                                    }}
                                />
                            )}
                        </div>

                        {/* Username with gradient underline */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '25px' }}>
                            <div
                                style={{
                                    fontSize: '56px',
                                    fontWeight: '900',
                                    color: '#1a1a1a',
                                    letterSpacing: '-2px',
                                }}
                            >
                                @{data.username}
                            </div>
                            <div
                                style={{
                                    width: '120px',
                                    height: '4px',
                                    background: gradient,
                                    borderRadius: '2px',
                                    marginTop: '8px',
                                }}
                            />
                        </div>

                        {/* Score - MASSIVE with shadow */}
                        <div
                            style={{
                                display: 'flex',
                                position: 'relative',
                                marginTop: '20px',
                            }}
                        >
                            {/* Score shadow */}
                            <div
                                style={{
                                    position: 'absolute',
                                    fontSize: '160px',
                                    fontWeight: '900',
                                    background: gradient,
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    opacity: 0.15,
                                    top: '8px',
                                    left: '8px',
                                }}
                            >
                                {data.result.score}
                            </div>
                            <div
                                style={{
                                    fontSize: '160px',
                                    fontWeight: '900',
                                    background: gradient,
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    lineHeight: 1,
                                    position: 'relative',
                                }}
                            >
                                {data.result.score}
                            </div>
                        </div>

                        {/* Badge & Rank */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px',
                                marginTop: '15px',
                                padding: '18px 50px',
                                background: `linear-gradient(135deg, ${accentColor}20, ${secondaryColor}10)`,
                                borderRadius: '60px',
                                border: `3px solid ${accentColor}40`,
                                boxShadow: `0 8px 25px ${accentColor}30`,
                            }}
                        >
                            <div style={{ fontSize: '56px' }}>{data.result.badge}</div>
                            <div
                                style={{
                                    fontSize: '48px',
                                    fontWeight: '900',
                                    color: '#1a1a1a',
                                    letterSpacing: '2px',
                                }}
                            >
                                {data.result.rank.toUpperCase()}
                            </div>
                        </div>

                        {/* Percentile badge */}
                        <div
                            style={{
                                marginTop: '25px',
                                padding: '14px 40px',
                                background: gradient,
                                borderRadius: '40px',
                                fontSize: '24px',
                                fontWeight: '900',
                                color: 'white',
                                boxShadow: `0 6px 30px ${accentColor}70, inset 0 1px 0 rgba(255,255,255,0.3)`,
                                letterSpacing: '1px',
                            }}
                        >
                            TOP {data.result.percentile}% • FARCASTER
                        </div>

                        {/* Footer with line */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px' }}>
                            <div
                                style={{
                                    width: '100px',
                                    height: '2px',
                                    background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                                    marginBottom: '12px',
                                }}
                            />
                            <div
                                style={{
                                    fontSize: '18px',
                                    color: '#a0aec0',
                                    fontWeight: '700',
                                    letterSpacing: '3px',
                                }}
                            >
                                BASED ID
                            </div>
                        </div>

                        {/* Bottom corners */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '20px',
                                left: '20px',
                                width: '60px',
                                height: '60px',
                                borderBottom: `5px solid ${accentColor}`,
                                borderLeft: `5px solid ${accentColor}`,
                                borderRadius: '0 0 0 12px',
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '20px',
                                right: '20px',
                                width: '60px',
                                height: '60px',
                                borderBottom: `5px solid ${secondaryColor}`,
                                borderRight: `5px solid ${secondaryColor}`,
                                borderRadius: '0 0 12px 0',
                            }}
                        />
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
