
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ddzarwmozkgbxeicgzxu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkemFyd21vemtnYnhlaWNnenh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2ODcwODUsImV4cCI6MjAxNDI2MzA4NX0.MKFJtlvPyphxnDI3uYFKu1bk73ALI_X-85drwr_jlZU';

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
