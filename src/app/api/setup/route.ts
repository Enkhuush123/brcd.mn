import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const adminEmail = 'admin@bcrd.mn';
    const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123!', 10);
      await prisma.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          name: 'Super Admin',
          role: 'ADMIN'
        }
      });
      return NextResponse.json({ message: 'Admin user created successfully' });
    }
    
    return NextResponse.json({ message: 'Admin user already exists' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
