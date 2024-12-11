<?php

namespace App\Http\Controllers;

use App\Models\SupportTicket;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SupportTicketController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'page' => 'nullable|integer|min:0',
            'pageSize' => 'nullable|integer|min:1|max:100',
            'search' => 'nullable|string|max:255',
        ]);

        $page = $request->query('page', 0);
        $pageSize = $request->query('pageSize', 10);
        $search = $request->query('search');

        try {
            $supportTickets = SupportTicket::offset($page * $pageSize)->limit($pageSize)
                ->when($search, function ($query, $search) {
                    $query->where('message', 'LIKE', "%{$search}%")->orWhere('subject', 'LIKE', "%{$search}%");
                })
                ->get();

            return response()->json(['message' => 'Support tickets retrieved successfully', 'data' => $supportTickets]);
        } catch (\Exception) {
            return response()->json(['error' => 'An error occurred while retrieving the support tickets'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required|string|min:1|max:1000',
            'subject' => 'required|string|max:255',
            'contact_email' => 'required|email',
            'contact_phone' => 'required|numeric|max_digits:20',
        ]);

        try {
            $ticket = SupportTicket::create([
                'message' => $request->message,
                'subject' => $request->subject,
                'contact_email' => $request->contact_email,
                'contact_phone' => $request->contact_phone,
            ]);

            return response()->json(['message' => 'Send ticket successfully', 'data' => $ticket], Response::HTTP_CREATED);
        } catch (\Exception) {
            return response()->json(['error' => 'An error occurred while sending the ticket'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(SupportTicket $supportTicket)
    {
        try {
            $supportTicket->delete();

            return response()->json(['message' => 'Ticket deleted successfully']);
        } catch (\Exception) {
            return response()->json(['error' => 'An error occurred while deleting the ticket'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
