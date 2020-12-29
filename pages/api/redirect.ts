import { NextApiHandler } from 'next';

/**
 * Redirect an incoming GET request to the destination specified by the `?uri` parameter.
 * Remaining query parameters are passed to the destination.
 *
 * A 303 See Other response is used.
 */
const redirect: NextApiHandler = (req, res) => {
  console.log(req.query);
  const { uri: uriParam, ...restQuery } = req.query;
  const uri = Array.isArray(uriParam) ? uriParam[0] : uriParam;

  if (!uri) {
    res.status(400).send('Missing `?uri` parameter.');
    return;
  }

  const fullUri = new URL(uri);

  // Append other query parameters to the destination URI.
  for (const [name, value] of Object.entries(restQuery)) {
    if (Array.isArray(value)) {
      for (const element of value) {
        fullUri.searchParams.append(name, element);
      }
    } else {
      fullUri.searchParams.append(name, value);
    }
  }

  res.redirect(303, fullUri.href);
};

export default redirect;
