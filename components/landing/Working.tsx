import { steps } from "@/constants/data"

const Working = () => {
    return (
        <section className='max-w-280 mx-auto px-5 py-18'>
            <span className='section-tag'>How It Works</span>
            <h2 className='section-h2'>
                From install to AI assistant<br />in four steps.
            </h2>
            <p className='section-sub'>
                Define your app&apos;s features. We handle the intelligence layer.
            </p>
            <div className='steps-wrap'>
                {steps.map((step) => (
                    <div key={step.id} className='group step-card'>
                        <div className='step-num'>{step.id}</div>
                        <div className='step-icon'>{step.icon}</div>
                        <div className='step-title'>{step.title}</div>
                        <div className='step-desc'>{step.desc}</div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Working
