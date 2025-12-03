from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomUser, OrganizerRequest
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    OrganizerRequestSerializer
)

# View for user registration
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

# View for retrieving user profile
class ProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

# View for creating an organizer request   
class OrganizerRequestCreateView(generics.CreateAPIView):
    serializer_class = OrganizerRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        if hasattr(request.user, "organizer_request"):
            return Response({"detail": "Ai deja o cerere trimisă."}, status=400)

        data = request.data.copy()
        data["user"] = request.user.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)

        return Response(serializer.data, status=201)
    
# View for admin to list all organizer requests
class OrganizerRequestListAdminView(generics.ListAPIView):
    serializer_class = OrganizerRequestSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        return OrganizerRequest.objects.all()

# View for admin to update organizer request status
class OrganizerRequestUpdateAdminView(generics.UpdateAPIView):
    serializer_class = OrganizerRequestSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = OrganizerRequest.objects.all()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        status_value = request.data.get("status")

        if status_value not in ["approved", "rejected"]:
            return Response({"detail": "Status invalid."}, status=400)

        instance.status = status_value
        instance.save()

        if status_value == "approved":
            user = instance.user
            user.is_organizer = True
            user.save()

        return Response(OrganizerRequestSerializer(instance).data)