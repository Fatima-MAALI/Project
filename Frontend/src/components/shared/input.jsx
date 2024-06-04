export default function Input(props) {
    return (
        <label className="form-control w-full">
            {(props.topleft || props.topright) && <div className="label">
                {props.topleft && <span className="label-text">{props.topleft}</span>}
                {props.topright && <span className="label-text-alt">{props.topright}</span>}
            </div>}
            {props.error ? (
                <input type="text" placeholder="Type here" className="bg-base-200 input input-error input-bordered w-full"  {...props} />
            ) : (
                <input type="text" placeholder="Type here" className="bg-base-200 input input-bordered w-full"  {...props} />
            )}

            {props.error && <div className="label">
                <span className="label-text-alt text-error">{props.error}</span>
            </div>}
        </label>
    );
}