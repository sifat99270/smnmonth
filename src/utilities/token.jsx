import { jwtVerify, SignJWT } from "jose";

export async function createToken(id, email) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const payload = { id: id, email: email };
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER)
    .setExpirationTime(process.env.JWT_EXPIRATION_TIME)
    .sign(secret);

  return token;
}

export async function VerifyToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const data = await jwtVerify(token, secret);
    return data["payload"];
  } catch (e) {
    console.log(e,'error verifying');
  }
}
