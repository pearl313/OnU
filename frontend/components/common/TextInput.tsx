const TextInput = (props: {
  placeholder?: string;
  labelTopL?: string;
  labelTopR?: string;
  labelBotL?: string;
  labelBotR?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}): React.ReactElement => {
  const labelText =
    props.labelBotR &&
    props.labelBotR === '사용 가능한 닉네임입니다' ? (
      <span className="text-green-400 label-text-alt">
        {props.labelBotR}
      </span>
    ) : (
      <span className="text-red-400 label-text-alt">
        {props.labelBotR}
      </span>
    );

  return (
    <div className="w-full max-w-xs form-control">
      <label className="label">
        <span className="text-base font-bold label-text">
          {props.labelTopL}
        </span>
        <span className="label-text-alt">{props.labelTopR}</span>
      </label>
      <input
        type="text"
        placeholder={props.placeholder}
        className="w-full h-10 max-w-xs input input-bordered"
        onChange={props.onChange}
        value={props.value}
      />
      <label className="label">
        <span className="label-text-alt">{props.labelBotL}</span>
        {labelText}
      </label>
    </div>
  );
};

export default TextInput;
