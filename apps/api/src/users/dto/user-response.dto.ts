import { Exclude, Transform } from "class-transformer";
import { UserRole } from "../entities/user.entity";

function buildFileUrl(filename: string): string {
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename;
  }

  const baseUrl = process.env.APP_URL;
  return `${baseUrl}/${filename}`;
}

export class UserResponseDto {
  id: number;

  username: string;

  bio: string;

  @Transform(({ value }) => value != null ? buildFileUrl(value) : null)
  profilePicture: string | null;

  @Transform(({ value }) => value != null ? buildFileUrl(value) : null)
  coverPhoto: string | null;

  email: string;

  @Exclude()
  password: string;

  role: UserRole;
}
