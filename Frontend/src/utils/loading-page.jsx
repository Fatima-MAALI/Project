export default function LoadingPage() {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <p className="text-center font-semibold text-neutral text-3xl">loading...</p>
            <div className="mt-6" />
            <div className="loading loading-dots loading-lg" />
        </div>
    );
}