/**
 * Represents a Tweet.
 */
export interface Tweet {
  /**
   * The content of the tweet.
   */
  content: string;
  /**
   * The URL of the tweet once it's published.
   */
  tweetUrl?: string;
}

/**
 * Asynchronously posts content to Twitter.
 *
 * @param content The content to be tweeted.
 * @param authToken OAuth token for the user
 * @returns A promise that resolves to a Tweet object containing the content and the tweet URL.
 */
export async function postToTwitter(content: string, authToken: string): Promise<Tweet> {
  // TODO: Implement this by calling the Twitter API.

  return {
    content: content,
    tweetUrl: 'https://twitter.com/user/status/1234567890',
  };
}
