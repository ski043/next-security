import "server-only";

export async function getSecret() {
  const test = process.env.SUPER_SECRET_DAMN_DONT_LEAK;
}
