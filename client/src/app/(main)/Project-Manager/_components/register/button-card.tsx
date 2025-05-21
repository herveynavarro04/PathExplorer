
export function ButtonCard({ data }) {
    return (
        <div className="rounded-[10px] bg-[#f8f6fa] p-4 shadow-1 dark:bg-[#311a42] transition hover:bg-[#a997ba] dark:hover:bg-[#76598a] hover:scale-100 hover:cursor-pointer">
            <div className="flex justify-center items-center h-full ">
                <dl>
                    <dd className=" flex text-xl font-bold text-dark dark:text-white">{data}</dd>
                </dl>
            </div>
        </div>
    )
}