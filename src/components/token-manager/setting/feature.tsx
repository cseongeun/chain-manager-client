import { TOKEN_TYPE, useCreateTokenData } from '../../../atoms/token-manager';

type FeatureProps = {};

const Feature = ({}: FeatureProps) => {
  const [createData] = useCreateTokenData();

  return (
    <div className="p-5">
      <label className="ml-2  block font-bold text-gray-500">
        <input
          type="checkbox"
          // checked={rememberMe}
          // onChange={(e) => {
          //   setRememberMe(e.target.checked);
          // }}
        />

        <span className="ml-2 py-2 text-sm leading-snug text-gray-600">
          Remember Me
        </span>
      </label>
    </div>
  );
};

export default Feature;
