export class BadRequestResponseDto {
  /**
   * Error message
   * @example "Validation failed: email must be a valid email"
   */
  message: string;

  /**
   * Optional details about which fields failed
   * @example { "email": "Invalid email format" }
   */
  errors?: Record<string, string>;
}
