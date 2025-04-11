from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    authentication_classes = [TokenAuthentication]  # Token-based authentication
    permission_classes = [IsAuthenticated]  # Only authenticated users can access

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def secure_hello(request):
    return Response({"message": f"Hello, {request.user.username}!"})
