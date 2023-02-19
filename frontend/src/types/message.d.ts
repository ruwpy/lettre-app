export type TMessage = {
  id?: string;
  text: string;
  from_id: string;
  to_id?: string;
  created_at?: Date;
};
