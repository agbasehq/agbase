import { features } from "@/constants/data"

const Features = () => { 

    return (
        <section className='max-w-280 mx-auto px-5 py-18' id='features'>
            <span className='section-tag'>Features</span>
            <h2 className="section-h2">What DoclessAI gives you.</h2>
            <p className="section-sub">
                Ship an AI-powered assistant in your app without building any AI
                infrastructure yourself.
            </p>
            <div className="feat-grid">
                {features.map((feat, i)=>(
                    <div key={i} className={`feat-card ${feat.icon === "🧠" ? "hl" : ""}`}>
                        <div className={`feat-icon ${feat.className}`}>{feat.icon}</div>
                        <div className="feat-title">{feat.title}</div>
                        <div className="feat-desc">{feat.description}</div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Features
