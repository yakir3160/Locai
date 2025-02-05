import Link from "next/link";

export const Logo = () => {
    return (
        <div>

            <div className={`bg-gradient-ai text-transparent bg-clip-text logo fixed left-1/2 transform -translate-x-1/2 md:left-0 md:translate-x-8 px-10 py-8`}>
                <Link href="/" className="">
                    <span className="text-4xl font-bold font-kumarOne">locai</span>
                </Link>
            </div>

        </div>
    );
}