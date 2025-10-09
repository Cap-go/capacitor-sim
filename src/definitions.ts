export interface SimPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
