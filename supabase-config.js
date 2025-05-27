// Supabase configuration
const SUPABASE_URL = 'https://klnopxnruagklreaokdc.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtsbm9weG5ydWFna2xyZWFva2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NzY2OTUsImV4cCI6MjA2MzI1MjY5NX0.eKHGjD1_y6V2Bf3aiErcU6lDdoh7EnVuv4OIXu1oKwg'

// Initialize Supabase client
const { createClient } = supabase
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Function to save diary entry
async function saveDiaryEntry(userId, entry) {
    try {
        const { data, error } = await supabaseClient
            .from('diary_entries')
            .insert([
                {
                    user_id: userId,
                    date: entry.date,
                    day: entry.day,
                    content: entry.text
                }
            ])
        
        if (error) throw error
        return { success: true, data }
    } catch (error) {
        console.error('Error saving entry:', error)
        return { success: false, error }
    }
}

// Function to get diary entries
async function getDiaryEntries(userId) {
    try {
        const { data, error } = await supabaseClient
            .from('diary_entries')
            .select('*')
            .eq('user_id', userId)
            .order('date', { ascending: false })
        
        if (error) throw error
        return { success: true, data }
    } catch (error) {
        console.error('Error fetching entries:', error)
        return { success: false, error }
    }
} 
