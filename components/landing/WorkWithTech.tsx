import Image from "next/image";


const WorkWithTech = () => {
    return (
        <div className="logos-bar">
            <span className="logos-label">Works with</span>
            <div className="logos-items">
                <Image unoptimized width={144} height={48} src="https://skillicons.dev/icons?i=react,nextjs,html" alt="React, Next.js, and HTML logos" />
            </div>
        </div>
    )
}

export default WorkWithTech
