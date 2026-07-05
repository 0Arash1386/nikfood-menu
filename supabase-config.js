const SUPABASE_URL = "https://rcumkcucyefyjatiqsfn.supabase.co";

const SUPABASE_KEY = "sb_publishable_lXBVhpTDMjhzyAxRacfXAg_4TkRImHt";

const { createClient } = supabase;

const db = createClient(SUPABASE_URL, SUPABASE_KEY);
