import Link from "next/link";
import HomeIcon from "@/src/assets/icons/home-smile-svgrepo-com.svg"

 const Logo = () => {
    return (
        <div>

            <div className={`bg-gradient-ai text-transparent bg-clip-text logo fixed left-1/2 transform -translate-x-1/2 md:left-0 md:translate-x-8 px-10 py-8`}>
                <Link href="/" className="">
                    {/*<HomeIcon className={`size-6 text-green-500`} />*/}
                    <span className="text-4xl font-bold">locai</span>
                </Link>
            </div>

        </div>
    );
}
export default Logo;