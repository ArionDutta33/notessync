import { Database } from './supabase';
export type Notes = Database['public']['Tables']['notes']['Row'];
