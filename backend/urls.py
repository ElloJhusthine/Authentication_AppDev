from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.response import Response
from rest_framework.decorators import api_view
from todo.views import TaskViewSet, secure_hello, CustomObtainAuthToken
from django.views.generic import TemplateView

# DRF router for Task API
router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

# Root welcome route
@api_view(['GET'])
def api_root(request):
    return Response({
        "message": "Welcome to the TODO API with Token Authentication!",
        "routes": [
            "/admin/",
            "/api/tasks/",
            "/api/token-auth/",
            "/secure-hello/"
        ]
    })

urlpatterns = [
    path('', api_root),  # 👈 Root welcome
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),                          # Task API routes
    path('api/token-auth/', CustomObtainAuthToken.as_view()),   # Token auth endpoint
    path('secure-hello/', secure_hello),                         # Protected endpoint
    path('login/', TemplateView.as_view(template_name='login.html')),
]
